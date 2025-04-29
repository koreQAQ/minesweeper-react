import { useState } from 'react'
import MineBlock from './MineBlock';
import './Board.css'

const directions = [
    [-1, -1],
    [0, -1],
    [1, -1],

    [-1, 0],
    [1, 0],

    [-1, 1],
    [0, 1],
    [1, 1],
]


function Board({ width, height }) {

    function generateBlocks() {
        const newBlocks = Array.from({ length: width },
            (_, x) => Array.from({ length: height }, (_, y) => {
                return {
                    id: x + ',' + y,
                    x: x,
                    y: y,
                    adjacentMines: 0,
                    revealed: false, mine: Math.random() < 0.1, flagged: false
                }
            })
        )
        newBlocks.forEach((row) => {
            row.forEach((block) => {
                if (!block.mine) {
                    getSiblings(block, newBlocks).forEach((b) => {
                        if (b.mine) {
                            block.adjacentMines += 1
                        }
                    })
                }
            })
        })
        return newBlocks
    }

    function getSiblings(block, blocks) {
        return directions.map(([dx, dy]) => {
            const ox = block.x + dx
            const oy = block.y + dy
            if (ox < 0 || ox >= width || oy < 0 || oy >= height)
                return undefined
            return blocks[ox][oy]
        }).filter(Boolean)
    }
    const [blocks, setBlocks] = useState(generateBlocks());

    const [finish, setFinish] = useState(false);

    function handleClick(block) {
        if (finish) {
            reset()
            return
        }
        block.revealed = true
        if (block.mine) {
            done();
            return
        }
        expandZero(block)
        checkState()
    }

    function done() {
        setFinish(true);
        const toggleBlocks = blocks.slice(0);
        toggleBlocks.forEach((row) => { row.forEach(b => b.revealed = true) });
        setBlocks(toggleBlocks);
    }

    function handleRightClick(block) {
        if (finish) return
        block.flagged = !block.flagged
        setBlocks(blocks.slice())
        checkState()
    }

    function checkState() {
        // 1. 所有的炸弹都被标记了
        const flatBlocks = blocks.flat()
        if (flatBlocks.every(b => b.revealed || b.flagged)) {
            if (flatBlocks.some(b => b.flagged && !b.mine)) {
                alert('You cheat')
                done()
            }
            else {
                alert('You win')
                done()
            }
        }
    }

    function expandZero(block) {
        // 0点要找到周边的0
        if (!block.adjacentMines) {
            getSiblings(block, blocks).forEach((zero) => {
                if (zero.revealed)
                    return
                zero.revealed = true
                expandZero(zero)
            })
        }
        setBlocks(blocks.slice(0))
    }

    const [dev, setDev] = useState(false)

    function toggle() {
        setDev(!dev)
        const toggleBlocks = blocks.slice(0)
        toggleBlocks.forEach((row) => { row.forEach(b => b.revealed = !b.revealed) })
        setBlocks(toggleBlocks)
    }

    function reset() {
        setFinish(false)
        setBlocks(generateBlocks())
    }

    const data = blocks.map(row => {
        const values = row.map(block => {
            return (
                <MineBlock block={block} handleClick={() => handleClick(block)} handleRightClick={() => handleRightClick(block)} key={block.id} />
            )
        }
        )
        return (<div className="row" >{values}</div>)
    })

    return (
        <>
            <div className='board'>{data}</div>
            <div className="flex justify-center m-2 ">
                <button className="border-transient w-30 bg-green-400/30 rounded-md" onClick={toggle}>
                    {dev ? "DEV" : "NORMAL"}
                </button>
                <button className="border-transient w-20 bg-green-400/30 rounded-md" onClick={reset}>
                    RESET
                </button>

            </div>
        </>
    )
}


export default Board

