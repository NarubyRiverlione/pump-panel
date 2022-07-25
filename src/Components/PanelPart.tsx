type PropsTypes = {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>
}

export default function PanelPart({ children }:PropsTypes) {
  return (
    <div className="PanelPart">

      {children}
    </div>
  )
}
