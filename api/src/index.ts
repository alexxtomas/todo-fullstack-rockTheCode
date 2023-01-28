import 'dotenv/config.js'
import app from './servers/app.js'

app.listen(app.get('port'), () =>
  console.log(`Server runnin on port ${app.get('port')} 🚀`)
)
