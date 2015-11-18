/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	var form  = document.getElementsByTagName('form')[0];
	var email = document.getElementById('mail');
	var error = document.querySelector('.error');

	if (localStorage.getItem('email')!== null){
	  email.defaultValue = localStorage.getItem('email');
	}

	email.addEventListener("keyup", function (event) {
	  // Each time the user types something, we check if the
	  // email field is valid.
	  if (email.validity.valid) {
	    // In case there is an error message visible, if the field
	    // is valid, we remove the error message.
	    error.innerHTML = ""; // Reset the content of the message
	    error.className = "error"; // Reset the visual state of the message
	  }
	}, false);
	form.addEventListener("submit", function (event) {
	  // Each time the user tries to send the data, we check
	  // if the email field is valid.
	  if (!email.validity.valid) {

	    // If the field is not valid, we display a custom
	    // error message.
	    error.innerHTML = "Please check your email address!";
	    error.className = "error active";
	    // And we prevent the form to be sent by canceling the event
	    event.preventDefault();
	  } else {
	    localStorage.setItem('email', email.value);
	    // console.log(email.value);
	  }
	}, false);


/***/ }
/******/ ]);