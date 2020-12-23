if [[ "$OSTYPE" == "darwin"* ]]; then
  # Mac OSX
  [ -f "node_modules/web3-eth-abi/src/index.js" ] && sed -i '' 's/(nonIndexedData)/(nonIndexedData \&\& nonIndexedData !== "0x" \&\& nonIndexedData !== "0X")/' node_modules/web3-eth-abi/src/index.js
  [ -f "node_modules/web3-eth-contract/node_modules/web3-eth-abi/src/index.js" ] && sed -i '' 's/(nonIndexedData)/(nonIndexedData \&\& nonIndexedData !== "0x" \&\& nonIndexedData !== "0X")/' node_modules/web3-eth-contract/node_modules/web3-eth-abi/src/index.js
else
  if [ -f "node_modules/web3-eth-abi/src/index.js" ]; then
    sed -i 's/(nonIndexedData)/(nonIndexedData \&\& nonIndexedData !== "0x" \&\& nonIndexedData !== "0X")/' node_modules/web3-eth-abi/src/index.js
  fi

  if [ -f "node_modules/web3-eth-contract/node_modules/web3-eth-abi/src/index.js" ]; then
    sed -i 's/(nonIndexedData)/(nonIndexedData \&\& nonIndexedData !== "0x" \&\& nonIndexedData !== "0X")/' node_modules/web3-eth-contract/node_modules/web3-eth-abi/src/index.js
  fi
fi
