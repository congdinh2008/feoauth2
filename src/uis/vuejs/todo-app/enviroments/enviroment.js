const environment = {
  name: "production",
  OpenIdConnect: {
    Authority: "https://localhost:5001",
    ClientId: "fa_tms_vue_client",
  },
  ResourceServer: {
    Endpoint: "http://localhost:1990/api/",
  },
  CurrentUrl: "http://localhost:8080/",
};
export default environment;
