
module.exports = {
    url: 'http://automationpractice.multiformis.com/index.php?controller=contact',
    elements: {
      subjectHeading: '#id_contact', // Selector for the subject heading dropdown
      emailField: '#email', // Selector for the email input field
      orderRefField: '#id_order', // Selector for the order reference input field
      messageBox: '#message', // Selector for the message textarea
      fileUpload: '#fileUpload', // Selector for the file upload input
      sendButton: '#submitMessage', // Selector for the send button
      successAlert: '.alert.alert-success', // Selector for the success alert
      errorAlert: '.alert.alert-danger' // Selector for the error alert
    }
  };
  