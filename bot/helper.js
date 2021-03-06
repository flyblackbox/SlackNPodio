'use strict';

/**
  * Filters an array of "fields" by label or text value
  * @param {Array} fields
  * @param {String} name
  * @return {Object}
**/
const filterFields = exports.filterFields = (fields, name) => {
  return fields.filter((field) => field.label === name || field.text === name)[0];
}
/**
  * Retrieves the ID for an Item object.
  * @param {Object} item
  * @return {Number}
**/
const getItemID = exports.getItemID = (item) => item.item_id;
/**
  * Retrieves the field ID for an item by field name.
  * @param {Object} item
  * @param {String} name
  * @return {Number}
**/
const getFieldID = exports.getFieldID = (item, name) => {
  return filterFields(item.fields, name).field_id;
}
/**
  * Retrieves the ID for a field value.
  * @param {Array} options
  * @param {String} name
  * @return {Number}
**/
const getFieldValueID = exports.getFieldValueID = (options, value) => {
  return filterFields(options, value).id;
}
/**
  * Provides useful information for the user.
  * @return {String}
**/
const showHelp = exports.showHelp = () => {
  return `*SlacknPodio Usage:*

  Allows team members to interact with data from Podio by using commands within a Slack channel.
  Any team member can easily retrieve information, or make updates without ever opening a browser.
  Even team members without a Podio account now have the ability to interact with Podio right from within a Slack channel.

  *Synopsis*

    \`@podio [options]\`
  `;

}
/**
  * Retrieves the link for the item.
  * @param {Object} item
  * @return {String}
**/
const getURL = exports.getURL = (item) => item.link;
/**
  * Validates the type of response and returns the right value.
  * @param {Object} value
  * @return {Number || String}
**/
const checkValue = exports.checkValue = (value) => {
  return parseInt(value, 10) || value.text || (typeof value === 'object' ?
    JSON.stringify(value) :
    value);
};
/**
  * Takes response from podio api to get files
  * and retrieves the important data
  * @param {String} input
  * @return {String} output
**/
const listFiles = exports.listFiles = (input) => {
  let output = '';
  input.forEach((file) => {
    output+= `*File:* ${file.name}, *size:* ${file.size? file.size + ' kb': file.size}, *link:* ${file.link}\n`;
  });
  return output;
}
/**
  * Converts a string to a boolean
  * source: http://stackoverflow.com/questions/263965
  * @param {String} input
  * @return {Boolean}
**/
const isTrue = exports.isTrue = (input) => {
  if (typeof(input) === 'string') {
    input = input.toLowerCase().trim();
  }
  switch (input) {
    case true:
    case "true":
    case 1:
    case "1":
    case "on":
    case "yes":
      return true;
    default:
      return false;
  }
}
