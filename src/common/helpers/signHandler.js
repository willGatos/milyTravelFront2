function SignHandler (accessToken, clientData, setClientData, setAccessToken){
    setAccessToken(accessToken)
    localStorage.setItem("accessToken", accessToken);
    setClientData(clientData);
    //setLoadItem(70)
}

export default SignHandler;