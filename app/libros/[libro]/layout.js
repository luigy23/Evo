



export async function generateMetadata({ params }) {
    const {libro} = params
    const nombre = decodeURIComponent(libro)
    return {
      title: {nombre},
    }
  }
   


export default function DashboardLayout({ children }) {
    return <section>{children}</section>
  }