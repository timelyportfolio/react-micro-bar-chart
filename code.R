library(htmltools)
library(reactR)

attachDependencies(
  browsable(
    tagList(
      tags$head(tags$script(src="//d3js.org/d3.v3.min.js")),
      tags$body(tags$script(babel_transform(
'
ReactDOM.render(
  <MicroBarChart data={[1,5,2,4]} hoverColor="rgb(161,130,214)"
  fillColor="rgb(210,193,237)" />,
  document.body
)
'
      )))
    )
  ),
  list(
    html_dependency_react(),
    htmlDependency(
      name="microbarchart",
      version="0.1",
      src=file.path(getwd(),"src"),
      script="react-micro-bar-chart.js"
    )
  )
)