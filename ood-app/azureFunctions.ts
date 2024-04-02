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
          await temp1c.push({
            FullName: cadet.FullName,
            Status: cadet.Status,
            Code: cadet.CadetCode,
          });
        } else if (cadet.Year === 2025) {
          await temp2c.push({
            FullName: cadet.FullName,
            Status: cadet.Status,
            Code: cadet.CadetCode,
          });
        } else if (cadet.Year === 2026) {
          await temp3c.push({
            FullName: cadet.FullName,
            Status: cadet.Status,
            Code: cadet.CadetCode,
          });
        } else if (cadet.Year === 2027) {
          await temp4c.push({
            FullName: cadet.FullName,
            Status: cadet.Status,
            Code: cadet.CadetCode,
          });
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
      return data;
    } else {
      console.error("Error calling Azure Function:", response.status);
      // Handle error responses
    }
  } catch (error) {
    console.error("Error:", error);
    // Handle any network errors or exceptions
  }
};

export const call_writeCadetStatus = async (token, cadetCode, status) => {
  const functionUrl =
    "https://bearnecessititesfunctionapp.azurewebsites.net/api/writeCadetStatus?code=NKXcBBE7ghzMnLXuUi-wooHfgtf_FNDIopRu8TPbxUA7AzFuOPIaxA==&cadetCode=" +
    cadetCode +
    "&status=" +
    status;

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
      console.error("Error calling Azure Function:", response.status);
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
      console.error("Error calling Azure Function:", response.status);
      // Handle error responses
    }
  } catch (error) {
    console.error("Error:", error);
    // Handle any network errors or exceptions
  }
};

export const call_fireAlarm = async (token) => {
  const functionUrl =
    "https://bearnecessititesfunctionapp.azurewebsites.net/api/FireAlarm?code=5B6_BUatDs694Kaw1a_HoEPzXlbPpBW9UKhOovbBpVF1AzFum1xLhQ==";

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

export const call_writeMessage = async (token, company, messageContent) => {
  const functionUrl =
    "https://bearnecessititesfunctionapp.azurewebsites.net/api/writeMessage?code=msjv5OqAGN8RIrntYXr9Y4Gzl6qJTnpQ03wCpmHZ0rJeAzFuk5aEdw==&company=" +
    company.charAt(0) +
    "&messageContent=" +
    messageContent;

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
      console.error("Error calling Azure Function:", response.status);
      // Handle error responses
    }
  } catch (error) {
    console.error("Error:", error);
    // Handle any network errors or exceptions
  }
};

export const call_deleteMessage = async (token, time) => {
  const functionUrl =
    "https://bearnecessititesfunctionapp.azurewebsites.net/api/deleteMessage?code=srJKd-oshbLmwcSIE_i2kuRJDQpfdphwy7pIqstcIH7pAzFu5URvKw==&id=" +
    time;
  try {
    const response = await fetch(functionUrl, {
      method: "GET", // Or 'GET', 'PUT', etc., depending on your Azure Function configuration
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error calling Azure Function:", response.status);
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
      console.error("Error calling Azure Function:", response.status);
      // Handle error responses
    }
  } catch (error) {
    console.error("Error:", error);
    // Handle any network errors or exceptions
  }
};
