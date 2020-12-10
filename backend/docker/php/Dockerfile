FROM php:8.0.0-fpm

# Install PHP with MySQL
RUN docker-php-ext-install pdo_mysql

# Install git and zip
RUN apt update && \
  apt install -y \
    git \
    zip

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer