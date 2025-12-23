# BentoPDF Deployment Guide

This guide will help you set up automatic Docker image builds and deployments to Coolify.

## 📋 Prerequisites

- GitHub account (mafridi143)
- Docker Hub account
- Coolify instance running

## 🔧 Setup Steps

### 1. Docker Hub Setup

1. **Create a Docker Hub account** (if you don't have one):
   - Go to https://hub.docker.com/signup
   - Sign up with your email

2. **Create an Access Token**:
   - Go to https://hub.docker.com/settings/security
   - Click "New Access Token"
   - Name: `GitHub Actions - BentoPDF`
   - Permissions: `Read, Write, Delete`
   - **Copy the token** (you won't see it again!)

### 2. GitHub Secrets Configuration

1. Go to your repository: https://github.com/mafridi143/bentopdf
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add these two secrets:

   **Secret 1:**
   - Name: `DOCKER_USERNAME`
   - Value: `mafridi143` (your Docker Hub username)

   **Secret 2:**
   - Name: `DOCKER_TOKEN`
   - Value: `<paste the token you copied from Docker Hub>`

### 3. Understanding the Build Process

The GitHub Actions workflow will automatically build and push Docker images when:

#### **On Push to `main` branch:**
- Builds and pushes with `edge` tag
- Images created:
  - `mafridi143/bentopdf:edge` (default mode)
  - `mafridi143/bentopdf-simple:edge` (simple mode)
  - `ghcr.io/mafridi143/bentopdf:edge`
  - `ghcr.io/mafridi143/bentopdf-simple:edge`

#### **On Tag Push (e.g., `v1.0.0`):**
- Builds and pushes with version tags + `latest`
- Images created:
  - `mafridi143/bentopdf:latest`
  - `mafridi143/bentopdf:1.0.0`
  - `mafridi143/bentopdf:v1.0.0`
  - `mafridi143/bentopdf-simple:latest`
  - `mafridi143/bentopdf-simple:1.0.0`
  - `mafridi143/bentopdf-simple:v1.0.0`
  - Plus GitHub Container Registry versions

### 4. Making Changes and Triggering Builds

#### **For Development (Edge Builds):**
```bash
# Make your changes
git add .
git commit -m "Your commit message"
git push origin main
```

This will trigger an automatic build and push `edge` tagged images.

#### **For Production Releases:**
```bash
# Make your changes and commit them
git add .
git commit -m "Release v1.0.0"

# Create and push a tag
git tag v1.0.0
git push origin v1.0.0
```

This will:
1. Build and push Docker images with version tags
2. Create a GitHub Release with built artifacts
3. Update the `latest` tag

### 5. Coolify Setup

#### **Option A: Using Docker Hub Images**

1. In Coolify, create a new **Resource** → **Docker Image**
2. Configure:
   - **Image**: `mafridi143/bentopdf-simple:edge` (or `:latest` for stable)
   - **Port**: `8080`
   - **Auto-deploy**: Enable "Watch for new images"
   - **Polling interval**: 60 seconds (or your preference)

#### **Option B: Using GitHub Container Registry**

1. In Coolify, create a new **Resource** → **Docker Image**
2. Configure:
   - **Image**: `ghcr.io/mafridi143/bentopdf-simple:edge`
   - **Port**: `8080`
   - **Registry**: GitHub Container Registry (ghcr.io)
   - **Auto-deploy**: Enable "Watch for new images"

#### **Option C: Direct GitHub Integration (Recommended)**

1. In Coolify, create a new **Resource** → **GitHub App**
2. Select your repository: `mafridi143/bentopdf`
3. Configure:
   - **Branch**: `main`
   - **Build Pack**: Dockerfile
   - **Port**: `8080`
   - **Auto-deploy**: Enable

This will automatically rebuild and deploy whenever you push to `main`.

### 6. Environment Variables (Optional)

If you need to serve BentoPDF under a subdirectory (e.g., `/pdf/`):

In Coolify, add this build argument:
- **Name**: `BASE_URL`
- **Value**: `/pdf/`

## 🎯 Deployment Workflow

### Standard Development Flow:
```
1. Make changes locally
2. Test locally with: npm run dev
3. Commit and push to main
4. GitHub Actions builds Docker images
5. Coolify detects new image and auto-deploys
```

### Release Flow:
```
1. Update version in package.json
2. Commit changes
3. Create and push tag: git tag v1.0.0 && git push origin v1.0.0
4. GitHub Actions builds and creates release
5. Update Coolify to use :latest tag
```

## 🐳 Available Docker Images

### Simple Mode (Recommended for most users):
- `mafridi143/bentopdf-simple:latest` - Latest stable release
- `mafridi143/bentopdf-simple:edge` - Latest development build
- `mafridi143/bentopdf-simple:1.0.0` - Specific version

### Default Mode (All features):
- `mafridi143/bentopdf:latest` - Latest stable release
- `mafridi143/bentopdf:edge` - Latest development build
- `mafridi143/bentopdf:1.0.0` - Specific version

## 🔍 Monitoring Builds

1. **GitHub Actions**: https://github.com/mafridi143/bentopdf/actions
2. **Docker Hub**: https://hub.docker.com/r/mafridi143/bentopdf
3. **Coolify**: Check your deployment logs

## 🛠️ Local Testing

Test the Docker build locally before pushing:

```bash
# Build default mode
docker build -t mafridi143/bentopdf:test .

# Build simple mode
docker build --build-arg SIMPLE_MODE=true -t mafridi143/bentopdf-simple:test .

# Run locally
docker run -p 8080:8080 mafridi143/bentopdf-simple:test

# Or use docker-compose
docker-compose up
```

## 📝 Notes

- **Build time**: ~5-10 minutes (builds for both amd64 and arm64)
- **Image size**: ~50MB (nginx-alpine based)
- **Coolify polling**: Set to 60-300 seconds for auto-updates
- **GitHub Container Registry**: Images are also pushed to `ghcr.io` as a backup

## 🚨 Troubleshooting

### Build fails in GitHub Actions:
- Check if `DOCKER_USERNAME` and `DOCKER_TOKEN` secrets are set correctly
- Verify Docker Hub token has write permissions

### Coolify not auto-updating:
- Ensure "Watch for new images" is enabled
- Check polling interval is set
- Verify image name matches exactly

### Image not found:
- Wait for GitHub Actions to complete (~5-10 minutes)
- Check Docker Hub to confirm image was pushed
- Verify image tag exists (edge/latest/version)

## 📚 Additional Resources

- [GitHub Actions Workflow](.github/workflows/build-and-publish.yml)
- [Dockerfile](Dockerfile)
- [Docker Compose](docker-compose.yml)
