import './MineBlock.css'
function MineBlock({ block, handleClick }) {
  function getBlockState() {
    if (block.revealed) return block.mine ? 'mine' : 'displayed'
    return block.flagged ? 'flagged' : 'normal'
  }

  return (
    <button onClick={handleClick} className={'block' + ' ' + getBlockState()}>
      {block.revealed ? block.adjacentMines : 'X'}
    </button>
  )
}

export default MineBlock
