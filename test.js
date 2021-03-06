'use strict'

var test = require('tape')
var interval = require('./')

test(function (t) {
  t.deepEqual(interval('01:02:03.456'), {
    hours: 1,
    minutes: 2,
    seconds: 3,
    milliseconds: 456
  })
  t.equal(interval('01:02:03').toPostgres(), '3 seconds 2 minutes 1 hours')
  t.equal(interval('100:02:03').toPostgres(), '3 seconds 2 minutes 100 hours')
  t.equal(interval('1 year -32 days').toPostgres(), '-32 days 1 years')
  t.equal(interval('1 day -00:00:03').toPostgres(), '-3 seconds 1 days')
  t.equal(interval('00:00:00').toPostgres(), '0')
  t.equal(interval('00:00:00.5').milliseconds, 500)
  t.equal(interval('00:00:00.50').milliseconds, 500)
  t.equal(interval('00:00:00.500').milliseconds, 500)
  t.equal(interval('00:00:00.5000').milliseconds, 500)
  t.equal(interval('00:00:01.100').toPostgres(), '1.1 seconds')
  t.equal(interval('00:00:00.5').toPostgres(), '0.5 seconds')
  t.equal(interval('00:00:00.100500').milliseconds, 100.5)
  t.equal(interval('00:00:00.100500').toPostgres(), '0.1005 seconds')
  t.equal(interval('00:00:00.123456').toPostgres(), '0.123456 seconds')
  // toISO tests
  t.equal(interval('01:02:03').toISO(), 'P0Y0M0DT1H2M3S')
  t.equal(interval('100:02:03').toISO(), 'P0Y0M0DT100H2M3S')
  t.equal(interval('1 year -32 days').toISO(), 'P1Y0M-32DT0H0M0S')
  t.equal(interval('1 day -00:00:03').toISO(), 'P0Y0M1DT0H0M-3S')
  t.equal(interval('00:00:00').toISO(), 'P0Y0M0DT0H0M0S')
  t.equal(interval('00:00:01.100').toISO(), 'P0Y0M0DT0H0M1.1S')
  t.equal(interval('00:00:00.5').toISO(), 'P0Y0M0DT0H0M0.5S')
  t.equal(interval('00:00:00.100500').toISO(), 'P0Y0M0DT0H0M0.1005S')
  t.equal(interval('00:00:00.123456').toISO(), 'P0Y0M0DT0H0M0.123456S')
  t.end()
})
