import { Link } from "react-router-dom";
import Form from "../reusable_components/Form.jsx";
import { useParams } from "react-router-dom";

export default function LoginPage() {
  const { authType } = useParams();

  console.log("Auth Parameter: ", authType);

  return (
    <>
      <main className="w-screen pt-25 h-auto bg-[black]">
        <Form authType={authType} />
      </main>
    </>
  );
}
