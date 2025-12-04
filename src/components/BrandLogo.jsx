

// Using Simple Icons CDN for 100% brand accuracy
const getIconUrl = (slug, color) => `https://cdn.simpleicons.org/${slug}/${color.replace('#', '')}`;

const BrandLogo = ({ slug, color, size = 24, className }) => {
    if (!slug) return <div className={`rounded-full bg-gray-500 ${className}`} style={{ width: size, height: size }} />;
    return (
        <img
            src={getIconUrl(slug, color)}
            alt={slug}
            width={size}
            height={size}
            className={className}
            style={{ filter: 'drop-shadow(0 0 1px rgba(0,0,0,0.5))' }}
            onError={(e) => { e.target.style.display = 'none'; }}
        />
    );
};

export default BrandLogo;
