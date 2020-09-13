console.log('Start Yuque Interceptor')
docs = []
let yuque_interceptor = {
  originalFetch: window.fetch.bind(window),
  fetch: function (...args) {
    return yuque_interceptor.originalFetch(...args).then((res) => {
      var text = ''
      const reader = res.body.getReader();
      const stream = new ReadableStream({
        start(controller) {
          const push = () => {
            reader.read().then(({ value, done }) => {
              if (done) {
                controller.close();
                var response = JSON.parse(text)
                docs = response['data']
                return;
              }
              controller.enqueue(value);
              text += new TextDecoder("utf-8").decode(value)
              push();
            });
          };
          push();
        }
      });
      return new Response(stream, { headers: res.headers });
    });
  },
}
window.fetch = yuque_interceptor.fetch;


function publishAll() {
  docs.forEach(function (item) {
    if (item['status'] == 0) {
      console.log(item['title']);
      publish(item['id'])
    }
  });
}

function publish(id) {
  $.ajax({
    type: "PUT",
    url: "https://www.yuque.com/api/docs/" + id + "/publish",
    success: function (msg) {
      console.log(id + ",发布成功");
    },
    error: function () {
      console.log(id + ",发布失败");
    }
  });
}