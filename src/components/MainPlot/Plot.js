<form id="form">
  <label for="eq">Enter an equation:</label>
  <input type="text" id="eq" value="4 * sin(x) + 5 * cos(x/2)" />
  <input type="submit" value="Draw" />
</form>

<div id="plot"></div>

<p>
  Used plot library: <a href="https://plot.ly/javascript/">Plotly</a>
</p>

<script>
  function draw() {
    try {
      // compile the expression once
      const expression = document.getElementById('eq').value
      const expr = math.compile(expression)

      // evaluate the expression repeatedly for different values of x
      const xValues = math.range(-10, 10, 0.5).toArray()
      const yValues = xValues.map(function (x) {
        return expr.eval({x: x})
      })

      // render the plot using plotly
      const trace1 = {
        x: xValues,
        y: yValues,
        type: 'scatter'
      }
      const data = [trace1]
      Plotly.newPlot('plot', data)
    }
    catch (err) {
      console.error(err)
      alert(err)
    }
  }

  document.getElementById('form').onsubmit = function (event) {
    event.preventDefault()
    draw()
  }

  draw()
</script>

</body>
</html>
