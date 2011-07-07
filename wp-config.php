<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'projects_wordpress');

/** MySQL database username */
define('DB_USER', 'project_user');

/** MySQL database password */
define('DB_PASSWORD', 'passwd1000!');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'F-& TN#e&Hb*360c!(A}$9y9$vw`:MYhRQFyS+deJGtZg*16J^^-LMNvJ:,Q=ccS');
define('SECURE_AUTH_KEY',  ' m-3c3EPRjG6i60a]/8gFa 70jGq1h/(Wt+Ot;*Y)fuGAwU,}>ZV-VIrr6C`$GPi');
define('LOGGED_IN_KEY',    '.cG!y}?H/@BN7dE/vZ+A||J$ F%Iyfx{b:|Y)k-_C0I}Y[*{T T:mxU)_$RSIivW');
define('NONCE_KEY',        'C =1agpE Y2`HK+Ryu[Ct>1nJ[xfLu T|*~>nrS#QA2Poox7,`#D^5YQt}#;A2YX');
define('AUTH_SALT',        '$,>v/!a]0|S$cY/n7{kR4=pOqwnd{i@7R/&cR&Ur1l@jPghU1WhO}lXz&)9!>wl&');
define('SECURE_AUTH_SALT', '7dG CHs3Ssx57NY^]7c62E-08p4m|!<(_V&wbI~7Wd6txkep,,+0~xt3j;N{H9?L');
define('LOGGED_IN_SALT',   'r)swPK U3XYImsA*=YDq<~ {WTs6xGtt{K9?F91#6c;HvOCZRBEa(&7XhccmQnCK');
define('NONCE_SALT',       '7J-`N)JB-[xu?/W^fh@IK0wIa}&H}ge9cIf]{(=008p,<]`f&APRP A[V3  W1ly');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wdp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
