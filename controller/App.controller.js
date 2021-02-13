sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
  ],
  function (Controller, JSONModel, MessageToast) {
    "use strict";
    var pressDialog;
    var usr;
    return Controller.extend("Quickstart.controller.App", {
      pressDialog: null,
      onInit: function () {
        var logged = sessionStorage.getItem("Logged");
        usr = sessionStorage.getItem("User");
        if (logged === "X") {
          window.open("portale.html", "_self");
        }
        this.getView().setModel(
          new JSONModel({
            features: [
              "Esegui login ai servizi"
              /*,
											"Powerful Development Concepts",
											"Feature-Rich UI Controls",
											"Consistent User Experience",
											"Free and Open Source",
											"Responsive Across Browsers and Devices"*/
            ]
          })
        );
      },
      onShowPsw: function () {
        var selected = this.getView().byId("checkpsw").getSelected();
        if (selected == true) {
          this.getView().byId("passwordInput").setType("Text");
        } else {
          this.getView().byId("passwordInput").setType("Password");
        }
      },
      onShowPswDialog: function () {
        var selected = sap.ui.getCore().byId("checkpswdialog").getSelected();
        if (selected == true) {
          sap.ui.getCore().byId("passwordInputDialog").setType("Text");
          sap.ui.getCore().byId("passwordConfDialog").setType("Text");
        } else {
          sap.ui.getCore().byId("passwordInputDialog").setType("Password");
          sap.ui.getCore().byId("passwordConfDialog").setType("Password");
        }
      },
      onPressDia: function (complex) {
        sap.ui.core.BusyIndicator.hide();
        pressDialog = this.getView().byId("ListDialog");
        if (!pressDialog) {
          this.getView().destroyDependents();
          pressDialog = sap.ui.xmlfragment("Quickstart.view.DialogFrag", this);
          this.getView().addDependent(pressDialog);
          //pressDialog.setModel(this.getView().getModel());
          sap.ui.getCore().byId("compl").setText(complex);
          pressDialog.open();
        }
      },
      onSave: function (oEvent) {
        /*var msg = 'Saved successfully';
			MessageToast.show(msg);*/
        sap.ui.core.BusyIndicator.show();
        var apigClient = apigClientFactory.newClient({
          apiKey: "zJjDPc92wx5XovVCpTEkY8QozlzcJAIz6Yl0G4ik"
        });
        var that = this;
        var psw = sap.ui.getCore().byId("passwordInputDialog").getValue();
        var psw2 = sap.ui.getCore().byId("passwordConfDialog").getValue();
        //var path = "(Pwdob=\'POD\',Uname=\'" + usr + "\',Pwd=\'" + psw + "\')";

        var params = {
          Authorization: "Basic c3NpaTpsaW1waW8=",
          "X-Requested-With": "X"
          //"path": path //'(Pwdob=\'POD\',Uname=\'SSII\',Pwd=\'DQ3PCyo37B\')',
        };
        var body =
          '<entry xml:base="/sap/opu/odata/sap/ZWEB_USERS_SRV/" xmlns="http://www.w3.org/2005/Atom" xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata" ' +
          'xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices">' +
          '<content type="application/xml">' +
          "<m:properties>" +
          "<d:Pwdob>POD</d:Pwdob>" +
          "<d:Uname>" +
          usr +
          "</d:Uname>" +
          "<d:Pwd1>" +
          psw +
          "</d:Pwd1>" +
          "<d:Pwd2>" +
          psw2 +
          "</d:Pwd2>" +
          "</m:properties>" +
          "</content>" +
          "</entry>";

        apigClient
          .ZWEBUSERSSRVInit(params, body)
          .then(function (result) {
            MessageToast.show("Password Modificata", {
              duration: 4000, // default
              width: "20em", // default
              my: "center bottom", // default
              at: "center bottom", // default
              of: window, // default
              offset: "0 -30", // default
              collision: "fit fit", // default
              onClose: null, // default
              autoClose: true, // default
              animationTimingFunction: "ease", // default
              animationDuration: 1000, // default
              closeOnBrowserNavigation: true // default
            });

            sessionStorage.setItem("Logged", "X");
            sessionStorage.setItem("User", usr);
            pressDialog.close();
            pressDialog.destroy();
            setTimeout(function () {
              window.open("portale.html", "_self");
            }, 1000);
          })
          .catch(function (result) {
            // Add error callback code here.
            setTimeout(function () {
              MessageToast.show(
                result.data.error.innererror.errordetails[1].message,
                {
                  duration: 4000, // default
                  width: "20em", // default
                  my: "center bottom", // default
                  at: "center bottom", // default
                  of: window, // default
                  offset: "0 -30", // default
                  collision: "fit fit", // default
                  onClose: null, // default
                  autoClose: true, // default
                  animationTimingFunction: "ease", // default
                  animationDuration: 1000, // default
                  closeOnBrowserNavigation: true // default
                }
              );
              console.log(
                "Code: ",
                result.data.error.innererror.errordetails[1].code
              );
              console.log(
                "Message: ",
                result.data.error.innererror.errordetails[1].message
              );
              sap.ui.core.BusyIndicator.hide();
            }, 1000);
          });
      },
      onClose: function () {
        pressDialog.close();
        pressDialog.destroy();
      },
      onChange: function (oEvent) {
        var bState = oEvent.getParameter("state");
        this.byId("ready").setVisible(bState);
      },
      onLogin: function (oEvent) {
        sap.ui.core.BusyIndicator.show();
        var apigClient = apigClientFactory.newClient({
          apiKey: "zJjDPc92wx5XovVCpTEkY8QozlzcJAIz6Yl0G4ik"
        });
        var that = this;
        usr = this.getView().byId("inputText").getValue().toUpperCase();
        var psw = this.getView().byId("passwordInput").getValue();
        var path = "(Pwdob='POD',Uname='" + usr + "',Pwd='" + psw + "')";
        var params = {
          Authorization: "Basic c3NpaTpsaW1waW8=",
          //Origin: 'https://2eux8z72w3.execute-api.eu-west-3.amazonaws.com',
          path: path //'(Pwdob=\'POD\',Uname=\'SSII\',Pwd=\'DQ3PCyo37B\')',
        };
        var body = {
          // This is where you define the body of the request,
        };

        var additionalParams = {
          // If there are any unmodeled query parameters or headers that must be
          //   sent with the request, add them here.
          headers: {
            param0: "",
            param1: ""
          },
          queryParams: {
            param0: "",
            param1: ""
          }
        };
        apigClient
          .ZWEBUSERSSRVLogin(params)
          .then(function (result) {
            console.log("Pwd: ", result.data.d.Pwd);
            console.log("PwdChange: ", result.data.d.PwdChange);
            console.log("PwdComplexity: ", result.data.d.PwdComplexity);
            console.log("Pwdob: ", result.data.d.Pwdob);
            console.log("Uname: ", result.data.d.Uname);
            MessageToast.show("Accesso Effettuato", {
              duration: 3000, // default
              width: "20em", // default
              my: "center bottom", // default
              at: "center bottom", // default
              of: window, // default
              offset: "0 -30", // default
              collision: "fit fit", // default
              onClose: null, // default
              autoClose: true, // default
              animationTimingFunction: "ease", // default
              animationDuration: 1000, // default
              closeOnBrowserNavigation: true // default
            });
            if (result.data.d.PwdChange === "X") {
              that.onPressDia(result.data.d.PwdComplexity);
            } else {
              sessionStorage.setItem("Logged", "X");
              sessionStorage.setItem("User", usr);
              setTimeout(function () {
                window.open("portale.html", "_self");
              }, 2000);
            }
          })
          .catch(function (result) {
            // Add error callback code here.
            setTimeout(function () {
              MessageToast.show(
                result.data.error.innererror.errordetails[1].message,
                {
                  duration: 4000, // default
                  width: "20em", // default
                  my: "center bottom", // default
                  at: "center bottom", // default
                  of: window, // default
                  offset: "0 -30", // default
                  collision: "fit fit", // default
                  onClose: null, // default
                  autoClose: true, // default
                  animationTimingFunction: "ease", // default
                  animationDuration: 1000, // default
                  closeOnBrowserNavigation: true // default
                }
              );
              console.log(
                "Code: ",
                result.data.error.innererror.errordetails[1].code
              );
              console.log(
                "Message: ",
                result.data.error.innererror.errordetails[1].message
              );
              sap.ui.core.BusyIndicator.hide();
            }, 2000);
          });
      },
      onRecovery: function (oEvent) {
        sap.ui.core.BusyIndicator.show();
        var apigClient = apigClientFactory.newClient({
          apiKey: "zJjDPc92wx5XovVCpTEkY8QozlzcJAIz6Yl0G4ik"
        });
        var that = this;
        var usr = this.getView().byId("UserRecovery").getValue().toUpperCase();
        var email = this.getView().byId("EmailRecovery").getValue();
        var path = "(Pwdob='POD',Uname='" + usr + "',Email='" + email + "')";
        var params = {
          Authorization: "Basic c3NpaTpsaW1waW8=",
          //Origin: 'https://2eux8z72w3.execute-api.eu-west-3.amazonaws.com',
          path: path //'(Pwdob=\'POD\',Uname=\'SSII\',Pwd=\'DQ3PCyo37B\')',
        };
        var body = {
          // This is where you define the body of the request,
        };

        var additionalParams = {
          // If there are any unmodeled query parameters or headers that must be
          //   sent with the request, add them here.
          headers: {
            param0: "",
            param1: ""
          },
          queryParams: {
            param0: "",
            param1: ""
          }
        };
        apigClient
          .ZWEBUSERSSRVRecovery(params)
          .then(function (result) {
            /*console.log("Pwd: ", result.data.d.Pwd);
					console.log("PwdChange: ", result.data.d.PwdChange);
					console.log("PwdComplexity: ", result.data.d.PwdComplexity);
					console.log("Pwdob: ", result.data.d.Pwdob);
					console.log("Uname: ", result.data.d.Uname);*/
            sap.ui.core.BusyIndicator.hide();
            MessageToast.show("Nuova password inviata a: " + email, {
              duration: 4000, // default
              width: "20em", // default
              my: "center bottom", // default
              at: "center bottom", // default
              of: window, // default
              offset: "0 -30", // default
              collision: "fit fit", // default
              onClose: null, // default
              autoClose: true, // default
              animationTimingFunction: "ease", // default
              animationDuration: 1000, // default
              closeOnBrowserNavigation: true // default
            });
          })
          .catch(function (result) {
            // Add error callback code here.
            MessageToast.show(
              result.data.error.innererror.errordetails[1].message,
              {
                duration: 4000, // default
                width: "20em", // default
                my: "center bottom", // default
                at: "center bottom", // default
                of: window, // default
                offset: "0 -30", // default
                collision: "fit fit", // default
                onClose: null, // default
                autoClose: true, // default
                animationTimingFunction: "ease", // default
                animationDuration: 1000, // default
                closeOnBrowserNavigation: true // default
              }
            );
            console.log(
              "Code: ",
              result.data.error.innererror.errordetails[1].code
            );
            console.log(
              "Message: ",
              result.data.error.innererror.errordetails[1].message
            );
          });
      }
    });
  }
);
