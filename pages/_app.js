import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import Head from 'next/head'

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: (props) => ({
      html: {
        scrollBehavior: 'smooth',
      },
      body: {
        bg: mode('#f9fafb', '#111827')(props),
        color: mode('#1f2937', '#f3f4f6')(props),
        fontFamily: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
        lineHeight: 'tall',
      },
      '::-webkit-scrollbar': {
        width: '8px',
        height: '8px',
      },
      '::-webkit-scrollbar-track': {
        bg: mode('#f3f4f6', '#1f2937')(props),
      },
      '::-webkit-scrollbar-thumb': {
        bg: mode('#d1d5db', '#4b5563')(props),
        borderRadius: '4px',
      },
      '::-webkit-scrollbar-thumb:hover': {
        bg: mode('#9ca3af', '#6b7280')(props),
      },
    }),
  },
  colors: {
    brand: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c3d66',
    },
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'brand',
      },
    },
  },
})

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Modern Markdown Note App with 3D animations"
        />
        <title>MarkFlow - Markdown Note Editor</title>
      </Head>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}

export default MyApp
