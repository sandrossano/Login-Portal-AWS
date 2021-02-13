/*
 * Copyright 2010-2016 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

var apigClientFactory = {};
apigClientFactory.newClient = function (config) {
  var apigClient = {};
  if (config === undefined) {
    config = {
      accessKey: "",
      secretKey: "",
      sessionToken: "",
      region: "",
      apiKey: undefined,
      defaultContentType: "application/xml",
      defaultAcceptType: "application/json"
    };
  }
  if (config.accessKey === undefined) {
    config.accessKey = "";
  }
  if (config.secretKey === undefined) {
    config.secretKey = "";
  }
  if (config.apiKey === undefined) {
    config.apiKey = "";
  }
  if (config.sessionToken === undefined) {
    config.sessionToken = "";
  }
  if (config.region === undefined) {
    config.region = "us-east-1";
  }
  //If defaultContentType is not defined then default to application/json
  if (config.defaultContentType === undefined) {
    config.defaultContentType = "application/xml";
  }
  //If defaultAcceptType is not defined then default to application/json
  if (config.defaultAcceptType === undefined) {
    config.defaultAcceptType = "application/json";
  }

  // extract endpoint and path from url

  var invokeUrl =
    "https://cors-casillo-sap.herokuapp.com/https://742o1qcw9l.execute-api.eu-west-3.amazonaws.com/StageDeploy";
  //var invokeUrl = 'http://www.whateverorigin.org/get?url='+encodeURIComponent('https://2eux8z72w3.execute-api.eu-west-3.amazonaws.com/StageDeploy');
  var endpoint = /(^https?:\/\/[^\/]+)/g.exec(invokeUrl)[1];
  var pathComponent = invokeUrl.substring(endpoint.length);

  var sigV4ClientConfig = {
    accessKey: config.accessKey,
    secretKey: config.secretKey,
    sessionToken: config.sessionToken,
    serviceName: "execute-api",
    region: config.region,
    endpoint: endpoint,
    defaultContentType: config.defaultContentType,
    defaultAcceptType: config.defaultAcceptType
  };

  var authType = "NONE";
  if (
    sigV4ClientConfig.accessKey !== undefined &&
    sigV4ClientConfig.accessKey !== "" &&
    sigV4ClientConfig.secretKey !== undefined &&
    sigV4ClientConfig.secretKey !== ""
  ) {
    authType = "AWS_IAM";
  }

  var simpleHttpClientConfig = {
    endpoint: endpoint,
    defaultContentType: config.defaultContentType,
    defaultAcceptType: config.defaultAcceptType
  };

  var apiGatewayClient = apiGateway.core.apiGatewayClientFactory.newClient(
    simpleHttpClientConfig,
    sigV4ClientConfig
  );

  apigClient.zSCPWFFATTUREGRANOSRVGetDataFatturaSetGet = function (
    params,
    body,
    additionalParams
  ) {
    if (additionalParams === undefined) {
      additionalParams = {};
    }

    apiGateway.core.utils.assertParametersDefined(
      params,
      ["Authorization"],
      ["body"]
    );

    var zSCPWFFATTUREGRANOSRVGetDataFatturaSetGetRequest = {
      verb: "get".toUpperCase(),
      path:
        pathComponent +
        uritemplate("/ZSCP_WF_FATTURE_GRANO_SRV/getDataFatturaSet").expand(
          apiGateway.core.utils.parseParametersToObject(params, [])
        ),
      headers: apiGateway.core.utils.parseParametersToObject(params, [
        "Authorization"
      ]),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body: body
    };

    return apiGatewayClient.makeRequest(
      zSCPWFFATTUREGRANOSRVGetDataFatturaSetGetRequest,
      authType,
      additionalParams,
      config.apiKey
    );
  };

  apigClient.ZWEBUSERSSRVLogin = function (params, body, additionalParams) {
    if (additionalParams === undefined) {
      additionalParams = {};
    }

    apiGateway.core.utils.assertParametersDefined(
      params,
      ["Authorization", "path"],
      ["body"]
    );

    var ZWEBUSERSSRVLoginRequest = {
      verb: "get".toUpperCase(),
      path:
        pathComponent +
        uritemplate("/ZWEB_USERS_SRV/LoginSet").expand(
          apiGateway.core.utils.parseParametersToObject(params, [])
        ) +
        params["path"],
      headers: apiGateway.core.utils.parseParametersToObject(params, [
        "Authorization"
      ]),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body: body
    };

    return apiGatewayClient.makeRequest(
      ZWEBUSERSSRVLoginRequest,
      authType,
      additionalParams,
      config.apiKey
    );
  };

  apigClient.ZWEBUSERSSRVRecovery = function (params, body, additionalParams) {
    if (additionalParams === undefined) {
      additionalParams = {};
    }

    apiGateway.core.utils.assertParametersDefined(
      params,
      ["Authorization", "path"],
      ["body"]
    );

    var ZWEBUSERSSRVRecoveryRequest = {
      verb: "get".toUpperCase(),
      path:
        pathComponent +
        uritemplate("/ZWEB_USERS_SRV/PasswordInitSet").expand(
          apiGateway.core.utils.parseParametersToObject(params, [])
        ) +
        params["path"],
      headers: apiGateway.core.utils.parseParametersToObject(params, [
        "Authorization"
      ]),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body: body
    };

    return apiGatewayClient.makeRequest(
      ZWEBUSERSSRVRecoveryRequest,
      authType,
      additionalParams,
      config.apiKey
    );
  };

  apigClient.ZWEBUSERSSRVInit = function (params, body, additionalParams) {
    if (additionalParams === undefined) {
      additionalParams = {};
    }

    apiGateway.core.utils.assertParametersDefined(
      params,
      ["Authorization", "X-Requested-With"],
      ["body"]
    );

    var ZWEBUSERSSRVInitRequest = {
      verb: "post".toUpperCase(),
      path:
        pathComponent +
        uritemplate("/ZWEB_USERS_SRV/PasswordChangeSet").expand(
          apiGateway.core.utils.parseParametersToObject(params, [])
        ),
      headers: apiGateway.core.utils.parseParametersToObject(params, [
        "Authorization",
        "X-Requested-With"
      ]),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body: body
    };

    return apiGatewayClient.makeRequest(
      ZWEBUSERSSRVInitRequest,
      authType,
      additionalParams,
      config.apiKey
    );
  };

  apigClient.ZWEBPODSRVList = function (params, body, additionalParams) {
    if (additionalParams === undefined) {
      additionalParams = {};
    }

    apiGateway.core.utils.assertParametersDefined(
      params,
      ["Authorization", "path"],
      ["body"]
    );

    var ZWEBPODSRVListRequest = {
      verb: "get".toUpperCase(),
      path:
        pathComponent +
        uritemplate("/ZWEB_POD_SRV/ListDeliverySet").expand(
          apiGateway.core.utils.parseParametersToObject(params, [])
        ) +
        params["path"],
      headers: apiGateway.core.utils.parseParametersToObject(params, [
        "Authorization"
      ]),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body: body
    };

    return apiGatewayClient.makeRequest(
      ZWEBPODSRVListRequest,
      authType,
      additionalParams,
      config.apiKey
    );
  };

  apigClient.ZWEBPODSRVPos = function (params, body, additionalParams) {
    if (additionalParams === undefined) {
      additionalParams = {};
    }

    apiGateway.core.utils.assertParametersDefined(
      params,
      ["Authorization", "path"],
      ["body"]
    );

    var ZWEBPODSRVPosRequest = {
      verb: "get".toUpperCase(),
      path:
        pathComponent +
        uritemplate("/ZWEB_POD_SRV/PosDeliverySet").expand(
          apiGateway.core.utils.parseParametersToObject(params, [])
        ) +
        params["path"],
      headers: apiGateway.core.utils.parseParametersToObject(params, [
        "Authorization"
      ]),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body: body
    };

    return apiGatewayClient.makeRequest(
      ZWEBPODSRVPosRequest,
      authType,
      additionalParams,
      config.apiKey
    );
  };

  apigClient.ZWEBPODSRVSave = function (params, body, additionalParams) {
    if (additionalParams === undefined) {
      additionalParams = {};
    }

    apiGateway.core.utils.assertParametersDefined(
      params,
      ["Authorization", "X-Requested-With"],
      ["body"]
    );

    var ZWEBPODSRVSaveRequest = {
      verb: "post".toUpperCase(),
      path:
        pathComponent +
        uritemplate("/ZWEB_POD_SRV/SavePodDeliverySet").expand(
          apiGateway.core.utils.parseParametersToObject(params, [])
        ),
      headers: apiGateway.core.utils.parseParametersToObject(params, [
        "Authorization",
        "X-Requested-With"
      ]),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body: body
    };

    return apiGatewayClient.makeRequest(
      ZWEBPODSRVSaveRequest,
      authType,
      additionalParams,
      config.apiKey
    );
  };

  return apigClient;
};
