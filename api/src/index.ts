import 'dotenv/config.js'
import app from './servers/app.js'

app.listen(app.get('port'), () =>
  console.log(`Server running on port ${app.get('port')} 🚀`)
)
