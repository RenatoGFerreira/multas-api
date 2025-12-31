import { app } from './app';
import { env } from './shared/config/env'

const PORT = env.PORT || 3000;
const NODE = env.NODE_ENV

app.listen(PORT, () => {
  console.log(`🚀 Server running on Port ${PORT} in ${NODE} mode.`);
});
