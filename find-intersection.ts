type INode = {
  v: number;
  // parents: INode[];
  child: INode | null;
}

// type Nodes = {
//   nodes: INode[];
//   map: Record<number, INode>;
// }


// const getOrAddNode = (val: number, nodes: Nodes): INode => {
//   if (nodes.map[val] !== undefined) return nodes.map[val];

//   const node: INode = {
//     v: val,
//     parents: [],
//     children: [],
//   };

//   nodes.nodes.push(node);
//   nodes.map[val] = node;

//   return node;
// }

// const parseNodes = (arr: number[], nodes: Nodes): INode => {
//   const start = getOrAddNode(arr[0], nodes);

//   let currentEnd = start;

//   for (let i = 1, l = arr.length; i < l; i++) {
//     const newNode = getOrAddNode(arr[i], nodes);

//     newNode.parents.push(currentEnd);
//     currentEnd.children.push(newNode);
//   }

//   return start;
// }

// const findIntersection = (a: number[], b: number[]) => {
//   const intersections: number[] = [];

//   const nodes: Nodes = {
//     nodes: [],
//     map: {}
//   };

//   const aStart = parseNodes(a, nodes);
//   const bStart = parseNodes(a, nodes);

//   return intersections;
// }

const walkList = (start: INode, func: (nodeVal: number) => boolean ) => {
  let keepWalking = true;
  let node = start;

  while (node.child !== null && keepWalking) {
    keepWalking = func(node.v);
    node = node.child;
  }
}

const linkedFindIntersection = (a: INode, b: INode) => {
  const aArr: number[] = [];
  const bArr: number[] = [];
}

const findIntersection = (a: number[], b: number[]): [number, number] => {
  const intersection: [number,number] = [-1, -1];

  intersection[0] = a.findIndex((_a) => b.includes(_a));

  // no intersection found
  if (intersection[0] === -1) return intersection;

  const intersectionVal = a[intersection[0]];

  intersection[1] = b.findIndex((_b) => _b === intersectionVal);

  return intersection;
}
const findIntersectionNodes = (aNode: INode, bNode: INode): [number, number] => {
  const a: number[] = [];
  const b: number[] = [];

  walkList(aNode, (v) => {
    a.push(v);
    return true;
  });
  walkList(bNode, (v) => {
    b.push(v);
    return true;
  });

  return findIntersection(a, b);
}

const listA = [1, 4, 5, 6];
const listB = [2, 3, 4, 5, 6];

const nodeA: INode = {
  v: 1,
  child: {
    v: 4,
    child: {
      v: 5,
      child: {
        v: 6,
        child: null,
      }
    }
  }
};
const nodeB: INode = {
  v: 2,
  child: {
    v: 3,
    child: {
      v: 4,
      child: {
        v: 5,
        child: {
          v: 6,
          child: null,
        },
      }
    }
  }
};

console.log(findIntersection(listA, listB));
console.log(findIntersectionNodes(nodeA, nodeB));