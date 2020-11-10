const { defaults } = require('jest-config')
module.exports = {
  preset: 'ts-jest',
  moduleFileExtensions: ['ts', 'js'],
  coverageProvider: 'v8',
  coverageReporters: ['text', 'json']
}