import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Aquí puedes configurar el complemento react-swc
      // para deshabilitar la comprobación del espacio de nombres JSX
      swcOptions: {
        jsc: {
          transform: {
            react: {
              throwIfNamespace: false
            }
          }
        }
      }
    })
  ]
})
