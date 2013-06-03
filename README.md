# jquery.onepage

Convert any standard multi-page website into a single page app

## How it works

In the background, whenever a link is clicked, an *AJAX* call is made to the given url. The body and title of the response replaces those of the current page.

## Usage

Include the script *after* you have included jQuery in the *head* of the page. Invoke the *onepage* function.

```html
<head>
	<script type="text/javascript" src="/path/to/jquery.js"></script>
	<script type="text/javascript" src="/path/to/jquery.onepage.js"></script>
	<script type="text/javascript">
		$.onepage();
	</script>
</head>
```

## Configuration

An *options* object can be passed into the function

```js
$.onepage({
	configParameter1: configParameterValue1,
	configParameter2: configParameterValue2,
	.
	.
	.
});
```

The following parameters are currently supported:

### showLoader

Whether or not a *loader* element must be displayed while waiting for the response of an ajaz request (default: **true**).

### loaderHtml

If *showLoader* is set to true, custom loader html can be set here (default: "**loading…**").
        
### minLoaderTime (ms)

The minimum time that the loader will be displayed. The reasoning behind this is to avoid *flickering* when the response is very quick. The loader also, however, will never show for responses that come back quicker than 100 milliseconds. (default: **500**)
    
### rebind

Callback function that will always execute after a new page's content has been placed in the *DOM*. Place all existing event bindings in here. (default: function(){})
