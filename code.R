library(htmltools)
library(reactR)

attachDependencies(
  browsable(
    tagList(
      tags$head(
        tags$script(src="//d3js.org/d3.v3.min.js")
      ),
      tags$body(
        tags$script(babel_transform(
          'ReactDOM.render(<MicroBarChart data={[1,2,3,4,5]} />,document.body)'
        ))
      )
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