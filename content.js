const jquery = document.createElement('script');
jquery.setAttribute('type', 'text/javascript');
jquery.setAttribute('src', chrome.extension.getURL('js/jquery.js'));
document.documentElement.appendChild(jquery);

const yuque = document.createElement('script');
yuque.setAttribute('type', 'text/javascript');
yuque.setAttribute('src', chrome.extension.getURL('js/yuque.js'));
document.documentElement.appendChild(yuque);
