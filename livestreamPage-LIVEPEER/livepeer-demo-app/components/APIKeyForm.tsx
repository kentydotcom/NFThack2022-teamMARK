import React from "react";

interface Props {
  setApiKey: (apiKey: string) => void;
}

const APIKeyForm: React.FC<Props> = ({ setApiKey }) => {
  const submitHandler = (event: React.SyntheticEvent) => {
    const apiKey = "e03dc8eb-6a43-4503-ac3f-7d67cac1463c";

    setApiKey(apiKey);
  };

  return (
    <form
      className="px-4 h-3/5 flex justify-center flex-col lg:max-w-screen-md m-auto"
      onSubmit={submitHandler}
    >
      <input
        type="text"
        placeholder="ENTER to Start Your Own Broadcast!"
        className="border active:border-livepeer p-2 w-full rounded"
        name="apiKey"
      />


    </form>
  );
};

export default APIKeyForm;
