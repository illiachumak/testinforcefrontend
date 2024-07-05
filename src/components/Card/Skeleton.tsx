import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props: any) => (
  <ContentLoader 
    speed={1.5}
    width={280}
    height={300}
    viewBox="0 0 280 300"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="40" y="0" rx="26" ry="26" width="200" height="200" /> 
    <rect x="20" y="220" rx="5" ry="5" width="240" height="24" /> 
    <rect x="6" y="258" rx="13" ry="13" width="72" height="35" /> 
    <rect x="160" y="253" rx="14" ry="14" width="111" height="41" />
  </ContentLoader>
)

export default Skeleton;

