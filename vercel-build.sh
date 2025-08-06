#!/bin/bash

# Script de build para Vercel
echo "🚀 Iniciando build no Vercel..."

# Limpar cache se necessário
rm -rf node_modules/.cache

# Instalar dependências
npm install --legacy-peer-deps

# Build do projeto
npm run build

echo "✅ Build concluído!" 