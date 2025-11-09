const defaultPageMetaData = {
  title: 'Inventario Fullo'
};
const PageMetaData = ({
  title,
  description = defaultPageMetaData.description,
  keywords = defaultPageMetaData.keywords
}) => {
  return <>
      <title>{title ? `${title} - ${defaultPageMetaData.title}` : defaultPageMetaData.title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </>;
};
export default PageMetaData;