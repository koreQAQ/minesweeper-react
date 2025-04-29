import './MineBlock.css'
const numberColor = [
  'text-transparent',
  'text-green-500',
  'text-blue-500',
  'text-orange-500',
  'text-pink-500',
  'text-green-500',
  'text-yellow-500',
  'text-gold-500',
  'text-red-500',
]
function MineBlock({ block, handleClick }) {
  function getBlockState() {
    if (block.revealed) return block.mine ? 'bg-red-600/10 text-red-600' : numberColor[block.adjacentMines]
    return block.flagged ? 'bg-gray-500/10 ' : 'bg-gray-500/10 hover:bg-gray-500/20'
  }

  return (
    <button onClick={handleClick} className={"border-1 border-gray-500/10" + " " + getBlockState()}>
      {block.revealed ? block.mine ? 'X' : block.adjacentMines : ' '}
    </button>
  )
}

export default MineBlock
