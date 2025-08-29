#!/bin/bash
# M3-Agent Setup Script for Acrylic Alchemy

echo "Setting up M3-Agent integration for Acrylic Alchemy..."

# Check if M3-Agent directory exists
if [ ! -d "../m3-agent-master" ]; then
    echo "Error: M3-Agent directory not found at ../m3-agent-master"
    echo "Please ensure the M3-Agent repository is cloned in the parent directory"
    exit 1
fi

# Check if API config exists
if [ ! -f "../m3-agent-master/m3-agent-master/configs/api_config.json" ]; then
    echo "Error: M3-Agent API config not found"
    echo "Please ensure the M3-Agent repository is properly set up"
    exit 1
fi

echo "✅ M3-Agent directory found"
echo "✅ API configuration present"

# Install Python dependencies if setup.sh exists
if [ -f "../m3-agent-master/m3-agent-master/setup.sh" ]; then
    echo "Installing M3-Agent Python dependencies..."
    cd ../m3-agent-master/m3-agent-master
    bash setup.sh
    cd -
    echo "✅ Python dependencies installed"
else
    echo "⚠️  setup.sh not found, skipping Python dependency installation"
fi

echo ""
echo "M3-Agent integration setup complete!"
echo ""
echo "To use M3-Agent in Acrylic Alchemy:"
echo "1. Configure your API keys in ../m3-agent-master/m3-agent-master/configs/api_config.json"
echo "2. Start the Next.js app: npm run dev"
echo "3. Select 'M3-Agent (Advanced Memory)' from the AI Provider dropdown"
echo "4. Generate content to see M3-Agent enhanced results"
echo ""
echo "For more information about M3-Agent capabilities:"
echo "- Multimodal memory processing"
echo "- Long-term memory graphs"
echo "- Advanced reasoning capabilities"
echo "- Video and audio understanding"
