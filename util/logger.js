/***
Copyright 2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License").
You may not use this file except in compliance with the License.
A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed
on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
express or implied. See the License for the specific language governing
permissions and limitations under the License.
***/

'use strict';

var log4js = require('log4js');

function logger() {
  var logDir = process.env.NODE_LOG_DIR !== undefined ? process.env.NODE_LOG_DIR : '.';
  var appName = process.env.APP_NAME !== undefined ? process.env.APP_NAME : '';
  var logFileName = "application_" + appName + "_" + process.pid + ".log";

  var config = {
    "appenders": [
      {
        "type": "file",
        "filename": logDir + "/" + logFileName,
        "pattern": "-yyyy-MM-dd",
        "layout": {
          "type": "pattern",
          "pattern": "%d (PID: %x{pid}) %p %c - %m",
          "tokens": {
            "pid" : function() { return process.pid; }
          },
          category: [ "recordProcessor" ],
          level: 'INFO'
        },
      },
      {
        type:'console',
        level:'WARN',
        category: [ 'sampleProducer' ],
      }
    ],
    "levels": {
        "[all]": "ERROR",
        "recordProcessor": "INFO"
    }
  };

  log4js.configure(config, {});

  return {
    getLogger: function(category) {
      var logger = log4js.getLogger(category);
      return logger;
    }
  };
}

module.exports = logger;
