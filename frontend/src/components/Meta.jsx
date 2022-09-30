import { Helmet } from "react-helmet";
function Meta({ title, description, keywords }) {
  return (
    <>
      <Helmet>
        <title>{title} </title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Helmet>
    </>
  );
}
export default Meta;
Meta.defaultProps = {
  title: "Welecome to proshop",
  keywords: "electronics , buy electronics , cheap electronics",
  description: "We sell the best products for cheap",
};
