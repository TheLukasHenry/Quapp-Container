FROM mcr.microsoft.com/devcontainers/dotnet:0-7.0

# Install SQL Tools: SQLPackage and sqlcmd
COPY mssql/installSQLtools.sh installSQLtools.sh
RUN bash ./installSQLtools.sh \
     && apt-get clean -y && rm -rf /var/lib/apt/lists/* /tmp/library-scripts

RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y nodejs

# Install OpenJDK-11
RUN apt-get update && \
    apt-get install -y openjdk-11-jdk

# Verify Java installation
RUN java -version
