export const call_helloWorld = async (token) => {
  const functionUrl =
    "https://bearnecessititesfunctionapp.azurewebsites.net/api/HelloWorld?code=0vBFa7gasepknwj5ZxfqcRF6PbfhEdbqilKFg7JSfyReAzFuFkV35A==";
  try {
    const response = await fetch(functionUrl, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token.accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Test",
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Response from Azure Function:", data);
      // Process the data received from the Azure Function
    } else {
      console.error("Error calling Azure Function:", response.status);
      // Handle error responses
    }
  } catch (error) {
    console.error("Error:", error);
    // Handle any network errors or exceptions
  }
};

export const call_getCadetInfo = async (token, name) => {
  const functionUrl =
    "https://bearnecessititesfunctionapp.azurewebsites.net/api/getCadetInfo?code=vBTg1TJl5BurRdwZl47VLAUPPhAryNrcG1dWicfXk2jvAzFuYuZmRA==";

  try {
    const response = await fetch(functionUrl, {
      method: "POST", // Or 'GET', 'PUT', etc., depending on your Azure Function configuration
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullName: name }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Response from Azure Function:", data);
      // Process the data received from the Azure Function
    } else {
      console.error("Error calling Azure Function:", response.status);
      // Handle error responses
    }
  } catch (error) {
    console.error("Error:", error);
    // Handle any network errors or exceptions
  }
};
