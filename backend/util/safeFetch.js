import { resolve4 } from "node:dns/promises";
import https from "node:https";

const fetchViaIPv4Address = async (
  parsedUrl,
  address,
  options = {},
  timeoutMs = 30000,
) => {
  return new Promise((resolve, reject) => {
    const headers = {
      ...(options.headers || {}),
      host: parsedUrl.hostname,
    };

    const requestOptions = {
      protocol: parsedUrl.protocol,
      hostname: address,
      port: parsedUrl.port || 443,
      method: options.method || "GET",
      path: `${parsedUrl.pathname}${parsedUrl.search}`,
      headers,
      servername: parsedUrl.hostname,
    };

    const req = https.request(requestOptions, (res) => {
      const chunks = [];

      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => {
        const body = Buffer.concat(chunks).toString("utf-8");
        const status = res.statusCode ?? 0;

        resolve({
          ok: status >= 200 && status < 300,
          status,
          text: async () => body,
          json: async () => {
            if (!body) {
              return {};
            }
            return JSON.parse(body);
          },
        });
      });
    });

    req.setTimeout(timeoutMs, () => {
      req.destroy(new Error("ETIMEDOUT"));
    });

    req.on("error", reject);

    if (options.body) {
      const requestBody =
        typeof options.body === "string" || Buffer.isBuffer(options.body)
          ? options.body
          : JSON.stringify(options.body);
      req.write(requestBody);
    }

    req.end();
  });
};

const fetchViaIPv4 = async (url, options = {}, timeoutMs = 30000) => {
  const parsedUrl = new URL(url);
  const addresses = await resolve4(parsedUrl.hostname);
  const uniqueAddresses = [...new Set(addresses)].slice(0, 4);
  let lastError;

  for (const address of uniqueAddresses) {
    try {
      return await fetchViaIPv4Address(parsedUrl, address, options, timeoutMs);
    } catch (error) {
      lastError = error;
    }
  }

  throw (
    lastError || new Error("IPv4 fallback failed: no resolved IPv4 address")
  );
};

export const safeFetch = async (
  url,
  options = {},
  retries = 4,
  attempt = 1,
  allowIPv4Fallback = true,
) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  try {
    const res = await fetch(url, { ...options, signal: controller.signal });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errorText.slice(0, 500)}`);
    }

    clearTimeout(timeout);
    return res;
  } catch (err) {
    clearTimeout(timeout);

    const errorCode = err?.cause?.code || err?.code;
    const retriableCodes = [
      "ECONNRESET",
      "ETIMEDOUT",
      "ENETUNREACH",
      "EHOSTUNREACH",
      "EAI_AGAIN",
      "UND_ERR_CONNECT_TIMEOUT",
    ];

    const isRetriableNetworkError =
      err?.name === "AbortError" ||
      retriableCodes.includes(errorCode) ||
      (typeof err?.message === "string" &&
        (err.message.includes("fetch failed") ||
          err.message.includes("network") ||
          err.message.includes("socket")));

    if (retries > 0 && isRetriableNetworkError) {
      const delayMs = Math.min(1000 * 2 ** (attempt - 1), 8000);
      console.warn(
        `Request failed (${err.message}${errorCode ? ` | ${errorCode}` : ""}), retrying in ${delayMs}ms... (${retries} attempts left)`,
        url,
      );
      await new Promise((resolve) => setTimeout(resolve, delayMs));

      return safeFetch(
        url,
        options,
        retries - 1,
        attempt + 1,
        allowIPv4Fallback,
      );
    }

    if (allowIPv4Fallback && isRetriableNetworkError) {
      try {
        console.warn(`Attempting IPv4 fallback transport for: ${url}`);
        const ipv4Response = await fetchViaIPv4(url, options);

        if (!ipv4Response.ok) {
          const errorText = await ipv4Response.text();
          throw new Error(
            `HTTP ${ipv4Response.status}: ${errorText.slice(0, 500)}`,
          );
        }

        return ipv4Response;
      } catch (fallbackError) {
        const fallbackCode = fallbackError?.cause?.code || fallbackError?.code;
        console.error(
          `IPv4 fallback failed: ${fallbackError.message}${fallbackCode ? ` | ${fallbackCode}` : ""}`,
          url,
        );
      }
    }

    console.error(
      `TMDB fetch error: ${err.message}${errorCode ? ` | ${errorCode}` : ""}`,
      url,
    );
    throw err;
  }
};
