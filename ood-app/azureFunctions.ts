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
    "https://bearnecessititesfunctionapp.azurewebsites.net/api/getCadetInfo?code=vBTg1TJl5BurRdwZl47VLAUPPhAryNrcG1dWicfXk2jvAzFuYuZmRA==&name=" +
    name;

  try {
    const response = await fetch(functionUrl, {
      method: "POST",
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

export const call_readCompanyStatus = async (token, company) => {
  const functionUrl =
    "https://bearnecessititesfunctionapp.azurewebsites.net/api/readCompanyStatus?code=NFHDyubfGICKa2tE-gm5VPMhIT_os8a--yEHpLzymdbJAzFuEgiucA==&company=" +
    company;

  try {
    const response = await fetch(functionUrl, {
      method: "POST", // Or 'GET', 'PUT', etc., depending on your Azure Function configuration
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      // TODO: use a faster method to process data
      // seriously this is embarrassing code
      // maybe process it somewhere else too
      let temp1c = [];
      let temp2c = [];
      let temp3c = [];
      let temp4c = [];
      await data.forEach(async (cadet) => {
        if (cadet.Year === 2024) {
          // TODO: How to make this not break next year?
          await temp1c.push({ FullName: cadet.FullName, Status: cadet.Status });
        } else if (cadet.Year === 2025) {
          await temp2c.push({ FullName: cadet.FullName, Status: cadet.Status });
        } else if (cadet.Year === 2026) {
          await temp3c.push({ FullName: cadet.FullName, Status: cadet.Status });
        } else if (cadet.Year === 2027) {
          await temp4c.push({ FullName: cadet.FullName, Status: cadet.Status });
        }
      });
      return [temp1c, temp2c, temp3c, temp4c];
    } else {
      console.error("Error calling Azure Function:", response.status);
      // Handle error responses
    }
  } catch (error) {
    console.error("Error:", error);
    // Handle any network errors or exceptions
  }
};

export const call_readCadetStatus = async (token, cadetCode) => {
  const functionUrl =
    "https://bearnecessititesfunctionapp.azurewebsites.net/api/readCadetStatus?code=6E9h8r_tYFWw2pLar7ePVkE5gmdDCyiWonT2L2ZrAOnKAzFuzc84dw==&cadetCode=" +
    cadetCode;

  try {
    const response = await fetch(functionUrl, {
      method: "POST", // Or 'GET', 'PUT', etc., depending on your Azure Function configuration
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      console.error("Error calling Azure Function:", response.status);
      // Handle error responses
    }
  } catch (error) {
    console.error("Error:", error);
    // Handle any network errors or exceptions
  }
};
