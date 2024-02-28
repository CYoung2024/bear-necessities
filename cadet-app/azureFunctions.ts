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
      return data;
    } else {
      console.error(
        "Error calling Azure Function readCadetStatus:",
        response.status
      );
      // Handle error responses
    }
  } catch (error) {
    console.error("Error:", error);
    // Handle any network errors or exceptions
  }
};

export const call_writeCadetStatus = async (token, cadetCode, status) => {
  const functionUrl =
    "https://bearnecessititesfunctionapp.azurewebsites.net/api/writeCadetStatus?code=NKXcBBE7ghzMnLXuUi-wooHfgtf_FNDIopRu8TPbxUA7AzFuOPIaxA==" +
    "&cadetCode=" +
    cadetCode +
    "&status=" +
    status;

  console.log(token);
  console.log("writeCadetStatus Called");

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
      return data;
    } else {
      console.error(
        "Error calling Azure Function writeCadetStatus:",
        response.status
      );
      // Handle error responses
    }
  } catch (error) {
    console.error("Error:", error);
    // Handle any network errors or exceptions
  }
};

export const call_initCadetApp = async (token, cadetCode) => {
  const functionUrl =
    "https://bearnecessititesfunctionapp.azurewebsites.net/api/initCadetApp?code=yRDKpvF1IVcpQfbNmFlYSNQ_FFv-OeGP-vQaFPMicCFpAzFui5uvjw==&cadetCode=" +
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
      return data;
    } else {
      console.error(
        "Error calling Azure Function initCadetApp:",
        response.status
      );
      // Handle error responses
    }
  } catch (error) {
    console.error("Error:", error);
    // Handle any network errors or exceptions
  }
};

export const call_readCompanyMessages = async (token, company) => {
  const functionUrl =
    "https://bearnecessititesfunctionapp.azurewebsites.net/api/readCompanyMessages?code=POOHTOzIwlSCvJVh66GpWWojzJWnKn_dO4HSv5AcP1-QAzFuToZzaw==&company=" +
    company.charAt(0);

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
      return data;
    } else {
      console.error(
        "Error calling Azure Function readCompanyMessages:",
        response.status
      );
      // Handle error responses
    }
  } catch (error) {
    console.error("Error:", error);
    // Handle any network errors or exceptions
  }
};

export const call_updatePushToken = async (token, cadetCode, pushToken) => {
  const functionUrl =
    "https://bearnecessititesfunctionapp.azurewebsites.net/api/updatePushToken?code=q3GBgkrvLTQXrEqlD63WKpWmTO0Ds8GmosWuDpe___HFAzFuWpDRvg==" +
    "&cadetCode=" +
    cadetCode +
    "&notifCode=" +
    pushToken;

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
      return data;
    } else {
      console.error(
        "Error calling Azure Function updatePushToken:",
        response.status
      );
      // Handle error responses
    }
  } catch (error) {
    console.error("Error:", error);
    // Handle any network errors or exceptions
  }
};
