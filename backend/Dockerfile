# Use the official .NET SDK image for building the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy the project files and restore dependencies
COPY QuaveChallenge.API/*.csproj ./
RUN dotnet restore

# Copy the rest of the application files and build the application
COPY ./QuaveChallenge.API/ ./
RUN dotnet build -o /out

# Use the official .NET runtime image for running the application
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /out .

# Expose the port the application runs on
EXPOSE 5203

# Set the entry point for the container
ENTRYPOINT ["dotnet", "QuaveChallenge.API.dll"]