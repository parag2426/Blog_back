import { IKContext, IKUpload } from "imagekitio-react";

// This async function fetches the signature/token/expire from your backend
const authenticator = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/upload-auth`);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();

    // Ensure data is valid
    if (!data.signature || !data.token || !data.expire) {
      throw new Error("Invalid authentication data");
    }

    return {
      signature: data.signature,
      expire: data.expire,
      token: data.token,
    };
  } catch (err) {
    throw new Error(`Authentication failed: ${err.message}`);
  }
};

// Upload component that allows parent to pass UI (`children`) and upload type (image/video)
const Upload = ({ children, type, setProgress, setData }) => {
  const handleError = (err) => {
    console.error("Upload error:", err);
  };

  const handleSuccess = (res) => {
    console.log("Upload success:", res);
    setData(res); // Set full response, extract `.url` later
  };

  const handleProgress = (progress) => {
    if (progress.total > 0) {
      const percent = Math.round((progress.loaded / progress.total) * 100);
      setProgress(percent);
    }
  };

  return (
    <IKContext
      publicKey={import.meta.env.VITE_IK_PUBLIC_KEY}
      urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
      authenticator={authenticator}
    >
      <IKUpload
        fileName={type === "image" ? "cover.jpg" : "video.mp4"}
        useUniqueFileName={true}
        onError={handleError}
        onSuccess={handleSuccess}
        onUploadProgress={handleProgress}
        accept={`${type}/*`} // Accept either image/* or video/*
        customInput={children} // This allows full control of the UI
      />
    </IKContext>
  );
};

export default Upload;
