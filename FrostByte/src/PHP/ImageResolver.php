<?php
/**
 * Image Resolver - Maps product names to actual image files
 * Handles variations in file extensions (.jpg, .avif, .png, etc.)
 */

class ImageResolver {
    private static $imageExtensions = array('.jpg', '.jpeg', '.png', '.avif', '.webp', '.gif');
    private static $basePath = '/FrostByte/resources/images/products/';
    
    /**
     * Resolve the actual image file for a product
     * @param string $productName - The product name
     * @return string - The complete URL path to the image
     */
    public static function resolveImagePath($productName) {
        if (empty($productName)) {
            return '/FrostByte/resources/images/background.avif';
        }
        
        $encodedName = urlencode($productName);
        $baseDir = $_SERVER['DOCUMENT_ROOT'] . '/FrostByte/resources/images/products/';
        
        // Try to find file with any of the supported extensions
        foreach (self::$imageExtensions as $ext) {
            // Try exact filename with extension
            $filePath = $baseDir . $productName . $ext;
            if (file_exists($filePath)) {
                return self::$basePath . $encodedName . $ext;
            }
            
            // Also try with spaces replaced
            $spacedPath = $baseDir . str_replace(' ', '_', $productName) . $ext;
            if (file_exists($spacedPath)) {
                return self::$basePath . str_replace(' ', '_', $encodedName) . $ext;
            }
        }
        
        // If no file found, return default with .jpg (will trigger 404 which can be caught)
        return self::$basePath . $encodedName . '.jpg';
    }
}
?>
