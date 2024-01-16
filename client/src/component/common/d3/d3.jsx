import { useEffect, useRef, useState } from 'react';
import { axisBottom, axisLeft, axisRight, axisTop, scaleBand, scaleLinear, select, svg } from 'd3';

export default function D3C({ data, width, height }) {
    const [right, setRight] = useState(50);
    const margin = {
        top: 15,
        right: width - (data.length * right),
        bottom: 15,
        left: 0
    }
    const xDomain = data.map(d => d.label);
    const xRange = [margin.left, margin.right];
    const yDomain = [0, 100];
    const w = width;
    const h = height;
    const yRange = [h, margin.top];


    const svgRef = useRef(null);
    const xRef = useRef(null);
    const yRef = useRef(null);

    useEffect(() => {
        const svg = select(svgRef.current)
        svg
            .attr('width', 100 + '%')
            .attr('height', h + 50)
        if (width >= 1550)
            setRight(60);
        if (width >= 1950)
            setRight(100);
        if (width < 1550)
            setRight(50);
    }, [h, width])
    return (
        <svg ref={svgRef}>
            <Scale
                xDomain={xDomain}
                xRange={xRange}
                yDomain={yDomain}
                yRange={yRange}
                render={({ xScale, yScale }) => {
                    select(yRef.current)
                        .attr('transform', `translate(50,0)`)
                        .call(axisLeft(yScale));
                    select(xRef.current)
                        .attr('transform', `translate(50,${h})`)
                        .call(axisBottom(xScale))

                    let x = ['text', 'path', 'line'];
                    x.map((el) => {
                        select(svgRef.current)
                            .selectAll(el)
                            .attr('color', '#6e7681')
                    })
                    select(svgRef.current)
                        .selectAll('text')
                        .attr('color', '#da70d6')
                    // .attr('color', '')


                    return (
                        <>
                            <g ref={yRef}>
                                {
                                    data.map((d, i) =>
                                        <Bar
                                            key={i}
                                            d={d}
                                            xScale={xScale}
                                            yScale={yScale}
                                            h={h}
                                        />)
                                }
                            </g>
                            <g ref={xRef}></g>
                        </>
                    )
                }}
            ></Scale>
        </svg>
    );
}

function Bar({ d, xScale, yScale, h }) {
    if (d.fill === undefined || d.fill === '' || d.fill === ' ')
        d.fill = '#babfff';

    return (
        <rect
            className='bar'
            fill={d.fill}
            x={xScale(d.label)}
            y={yScale(d.value)}
            width={xScale.bandwidth()}
            height={h - yScale(d.value)}
        />
    )
}

function Scale({ xDomain, xRange, yDomain, yRange, render }) {
    const xScale = scaleBand()
        .domain(xDomain)
        .range(xRange)
        .padding(0.7);
    const yScale = scaleLinear()
        .domain(yDomain)
        .range(yRange);

    const scale = {
        xScale,
        yScale
    };

    return (
        <>
            {render(scale)}
        </>
    )

}