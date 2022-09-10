import Lottie from "react-lottie";
import animationData from "../../public/wellcome.json";

const Login = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div
      className="flex justify-center items-center"
      style={{ width: "100vw", height: "100vh" }}
    >
      <Lottie options={defaultOptions} height={"40vh"} width={"40vw"} />
    </div>
  );
};

export default Login;
