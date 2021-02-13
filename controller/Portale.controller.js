sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
  ],
  function (Controller, MessageToast, JSONModel) {
    "use strict";
    var oModel;
    var usr;
    return Controller.extend("Quickstart.controller.Portale", {
      onInit: function () {
        var logged = sessionStorage.getItem("Logged");
        usr = sessionStorage.getItem("User");
        if (logged !== "X") {
          window.open("index.html", "_self");
        }
        // set mock model
        oModel = new JSONModel({
          TileCollection: [
            {
              icon: "sap-icon://shipping-status",
              //"type": "Monitor",
              number: "0",
              title: "Proof Of delivery",
              info: "    Consegne in attesa   ",
              infoState: "Error",
              //link: "https://45v9s.sse.codesandbox.io/"
              link: "https://pod.awskeytech.com"
            }
            /*,
					{
						"icon": "sap-icon://inbox",
						"number": "89",
						"title": "Approve Leave Requests",
						"info": "Overdue",
						"infoState": "Error"
					},
					{
						"type": "Create",
						"title": "Create Leave Requests",
						"info": "28 Days Left",
						"infoState": "Success"
					},
					{
						"icon": "sap-icon://travel-expense-report",
						"number": "281",
						"numberUnit": "euro",
						"title": "Travel Reimbursement",
						"info": "1 day ago"
					},
					{
						"icon": "sap-icon://loan",
						"number": "2380",
						"numberUnit": "euro",
						"title": "My Salary",
						"info": "8 days ago"
					},
					{
						"icon": "sap-icon://lab",
						"number": "1",
						"numberUnit": "Invention",
						"title": "Test Lab Reports",
						"info": "8 Days Ago"
					},
					{
						"icon": "sap-icon://inbox",
						"type": "Monitor",
						"title": "Leave Request History"
					},
					{
						"type": "Create",
						"title": "Create Purchase Order",
						"info": "890€ Open Budget",
						"infoState": "Success"
					},
					{
						"icon": "sap-icon://stethoscope",
						"number": "3",
						"title": "Yearly Health Check",
						"info": "3 year overdue",
						"infoState": "Error"
					},
					{
						"icon": "sap-icon://meal",
						"type": "Monitor",
						"title": "Meal Schedule"
					},
					{
						"icon": "sap-icon://cart",
						"number": "787",
						"numberUnit": "euro",
						"title": "My Shopping Carts",
						"info": "Waiting for Approval",
						"infoState": "Warning"
					},
					{
						"icon": "sap-icon://factory",
						"number": "2",
						"numberUnit": "Outages",
						"title": "Factory Power Management",
						"info": "Production On Hold",
						"infoState": "Error"
					},
					{
						"icon": "sap-icon://calendar",
						"title": "Team Calendar"
					},
					{
						"icon": "sap-icon://pie-chart",
						"number": "5",
						"title": "Financial Reports",
						"info": "4 day ago",
						"infoState": "Warning"
					}*/
          ]
        });

        this.getView().setModel(oModel);
        this.getNumbDel();
      },

      onAfterRendering: function () {
        this.getView().byId("userHeader").setText(usr);
      },

      getNumbDel: function () {
        sap.ui.core.BusyIndicator.show();
        /*var logged = sessionStorage.getItem('Logged');
			usr = sessionStorage.getItem('User');
			if (logged !== 'X') {
				window.open('login.html', '_self');
			} */

        var apigClient = apigClientFactory.newClient({
          apiKey: "9oYcmEwDgF130RD3m7mn05yH3eKeMBu3AQcFOkkg"
        });

        var that = this;
        //usr.toUpperCase() cambiare ssII
        var path = "?$filter=Usrid%20eq%20%27" + "SSII" + "%27";
        var params = {
          Authorization: "Basic c3NpaTpsaW1waW8=",
          //Origin: 'https://2eux8z72w3.execute-api.eu-west-3.amazonaws.com',
          path: path //'(Pwdob=\'POD\',Uname=\'SSII\',Pwd=\'DQ3PCyo37B\')',
        };
        apigClient
          .ZWEBPODSRVList(params)
          .then(function (result) {
            var oViewModel = new JSONModel(result.data.d);
            var ddt = oViewModel.getProperty("/");
            var cont = 0;
            for (var i = 0; i < ddt.results.length; i++) {
              var check = ddt.results[i].Check_ZPOD;
              if (check !== "sap-icon://accept") {
                cont++;
              }
            }
            oModel.setProperty("/TileCollection/0/number", cont + "");

            sap.ui.core.BusyIndicator.hide();
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
      },

      onLogout: function () {
        sessionStorage.clear();
        window.open("index.html", "_self");
      },
      onPressTile: function (evt) {
        var sPath = evt.getSource().getBindingContext().getPath();
        var oContext = oModel.getProperty(sPath);

        var d = new Date();
        var passhash = CryptoJS.MD5(d.getHours() + d.getMinutes()).toString();
        var link = oContext.link + "?US=" + usr + "&TK=" + passhash;
        window.open(link, "_self");
      }
    });
  }
);
