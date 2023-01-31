import app from './servers/app.js'

export const server = app.listen(app.get('port'), () =>
  console.log(`Server running on port ${app.get('port')} 🚀`)
)
