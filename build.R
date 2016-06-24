npm install -g coffee-react

cd /src
cjsx -cb index.cjsx

browserify --standalone MicroBarChart index.js > react-micro-bar-chart.js

