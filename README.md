# Multiple KCL consumers

This project is to demonstrate multiple KCL consumers for either

* Load balancing
* Multiple fan-out

This examples were cloned and modified from the AWS KCL examples in (https://github.com/awslabs/amazon-kinesis-client-nodejs)

KCL uses the `ApplicationName` to track the states of the consumer, thus different consumer thread with the same `ApplicationName` will be load-balancing, whilst consumer to the same Stream with different `ApplicationName` will consume the same message on the stream. 

## To start the producer

1. Install the modules `npm install`
2. Run the producer, `npm run run_producer` The script will create the stream if not found
3. The producer will post messages in sequencial order, starting from `1`

## To start load-balancing consumer

1. Run the producer, `npm run run_consumer1`
2. The consumer will create log file in the format of application_${application name}_${PID}.log, such as `application_consumer1_57784.log`
3. tail the log will show the records received
4. Open another terminal and run another consumer, `npm run run_consumer1`
5. Run `tail application*.log` will show that each of the consumer will load balance the messages, such as


```
==> application_consumer1_57784.log <==
2017-11-08 11:01:04.940 (PID: 57784) INFO recordProcessor - Record: {"time":"2017-11-08T19:01:03.482Z","reading":449}
2017-11-08 11:01:04.941 (PID: 57784) INFO recordProcessor - Record: {"time":"2017-11-08T19:01:04.495Z","reading":450}

==> application_consumer1_57784.log <==
2017-11-08 11:01:07.739 (PID: 57784) INFO recordProcessor - Record: {"time":"2017-11-08T19:01:05.574Z","reading":451}
2017-11-08 11:01:07.739 (PID: 57784) INFO recordProcessor - Record: {"time":"2017-11-08T19:01:06.597Z","reading":452}
```

## To start fan-out consumers
1. Run the producer, `npm run run_consumer1`
2. The consumer will create log file in the format of application_${application name}_${PID}.log, such as `application_consumer1_57784.log`
3. Open another terminal and run another consumer, `npm run run_consumer2`. The log for consumer2 will be something like `application_consumer2_57786.log`
5. Run `tail application*.log` will show that each of the consumer will load balance the messages, such as

```
==> application_consumer1_57784.log <==
2017-11-08 11:01:07.739 (PID: 57784) INFO recordProcessor - Record: {"time":"2017-11-08T19:01:05.574Z","reading":451}
2017-11-08 11:01:07.739 (PID: 57784) INFO recordProcessor - Record: {"time":"2017-11-08T19:01:06.597Z","reading":452}

==> application_consumer2_57786.log <==
2017-11-08 11:01:19.013 (PID: 57786) INFO recordProcessor - Record: {"time":"2017-11-08T19:01:05.574Z","reading":451}
```
